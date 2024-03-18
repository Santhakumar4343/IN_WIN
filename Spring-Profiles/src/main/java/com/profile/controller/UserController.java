package com.profile.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.profile.entity.User;
import com.profile.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
	Logger log=LoggerFactory.getLogger(UserController.class);
    @Autowired
    private  UserService userService;

    
    @PostMapping("/save")
    public User saveUser(@RequestBody User user) {
    	log.error("log from the save method in UserController");
        return userService.saveUser(user);
    }

    @GetMapping("/getAllUser")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping
    public String  greeet() {
    	log.error("log from the Greet method in UserController");
        return "Hello";
    }

    @GetMapping("/getUser/{id}")
    public Optional<User> getUserById(@PathVariable long id) {
        return userService.getUserById(id);
    }
}

