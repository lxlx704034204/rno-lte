package com.hgicreate.rno.pci.controller;

import com.hgicreate.rno.pci.model.User;
import com.hgicreate.rno.pci.service.AreaService;
import com.hgicreate.rno.pci.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpSession;
import java.security.Principal;

@Slf4j
@Controller
public class PlatformController {

    @Autowired
    private UserService userService;

    @Autowired
    private AreaService areaService;

    @Value("${rno.lte.page.index:index}")
    private String index;

    @GetMapping("/")
    String index(HttpSession session, Principal principal) {
        if (null == session.getAttribute("user")) {
            // 获取用户对象
            String username = principal.getName();
            User user = userService.getUser(username);
            log.info("在 Session 中添加用户：" + user);
            session.setAttribute("user", user);
        }
        return index;
    }

    @GetMapping("/user-manager")
    String userManager(Model model) {
        log.debug("所有用户 : " + userService.getAllNormalUsers());
        model.addAttribute("users", userService.getAllNormalUsers());
        model.addAttribute("cities", areaService.getAllCities());
        return "user-manager";
    }
}
