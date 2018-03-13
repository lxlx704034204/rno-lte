package com.hgicreate.rno.proxy.filter;

import com.hgicreate.rno.proxy.model.Audit;
import com.hgicreate.rno.proxy.model.User;
import com.hgicreate.rno.proxy.service.AuditService;
import com.hgicreate.rno.proxy.service.UserService;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.net.URL;
import java.security.MessageDigest;
import java.util.Date;

@Slf4j
public class ProxyFilter extends ZuulFilter {

    // 是否需要校验来源主机或IP
    @Value("${rno.lte.source.enabled:true}")
    private boolean enabled;

    // 来源主机或IP，用于安全校验
    @Value("${rno.lte.source.host:localhost}")
    private String host;

    @Autowired
    private UserService userService;

    @Autowired
    private AuditService auditService;

    public ProxyFilter() {
    }

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 1;
    }

    @Override
    public boolean shouldFilter() {
        // 先判断 session 中是否有用户名，如果没有则执行过滤器。
        return null == RequestContext
                .getCurrentContext()
                .getRequest()
                .getSession()
                .getAttribute("account");
    }

    @Override
    public Object run() {
        log.debug("执行过滤器。");
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();

        String username = request.getParameter("account");
        String referer = request.getHeader("REFERER");

        log.debug("写用户登录审计。");
        Audit audit = new Audit();
        audit.setUsername(username);
        audit.setIp(request.getRemoteAddr());
        audit.setLoginTime(new Date());
        audit.setUserAgent(request.getHeader("User-Agent"));
        audit.setHttpReferer(referer);
        auditService.save(audit);

        // 判断 REFERER
        String errorMsg = "";
        if (null == referer || "".equals(referer)) {
            log.debug("没有 REFERER。");
            errorMsg = "必须通过主系统访问功能，出于安全原因，已禁止访问此功能，请联系管理员，谢谢！";

        } else {
            log.debug("有 REFERER : " + referer);

            // 判断REFERER中的 IP 或 HOST 是否正确（在配置文件中设置）
            try {
                URL url = new URL(referer);
                log.debug("this.host = " + this.host);
                log.debug("referer = " + url.getHost());
                if (!this.enabled || url.getHost().equals(this.host)) {
                    // 不需校验或者是正确的父窗口
                    if (null == username || "".equals(username)) {
                        errorMsg = "未发现用户信息，无法访问此功能，请联系管理员，谢谢！";
                    } else {
                        log.debug("在 Session 中设置用户名：" + username);
                        request.getSession().setAttribute("account", username);
                        if (!userService.existsUser(username)) {
                            // 保存用户
                            log.debug("用户在数据库中不存在，保存用户。");
                            String md5Password = DatatypeConverter.printHexBinary(MessageDigest.getInstance("MD5")
                                    .digest(username.getBytes("UTF-8"))).toLowerCase();
                            userService.save(new User(null, username, md5Password,
                                    "外部用户", 0, 440100, new Date(), new Date(), 2));
                        } else {
                            log.debug("用户在数据库中已存在。");
                        }
                    }
                } else {
                    // 伪造的父窗口，或主系统的域名和IP已更改
                    errorMsg = "主系统域名或IP不正确，出于安全原因，已禁止访问此功能，请联系管理员，谢谢！";
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (errorMsg.length() > 0) {
            log.info("存在错误：" + errorMsg);
            errorMsg = "<html><head><meta charset='UTF-8'></head><body><h3>"
                    + errorMsg
                    + "</h3></body></html>";
            ctx.setResponseStatusCode(HttpServletResponse.SC_OK);
            ctx.getResponse().setCharacterEncoding("utf-8");
            ctx.setResponseBody(errorMsg);
            ctx.setSendZuulResponse(false);
        } else {
            log.debug("没有错误，顺利打开页面。");
        }

        return null;
    }
}
