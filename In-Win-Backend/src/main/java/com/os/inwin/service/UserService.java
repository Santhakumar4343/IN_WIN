package com.os.inwin.service;

import java.util.List;

import com.os.inwin.entity.User;

public interface UserService {

	User createUser(User user);

	User getUser(long id);

	List<User> getAllUser();

	User UpdateUser(long id, User user);

	void deleteUser(long id);

}
