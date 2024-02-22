package com.os.inwin.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Nominee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String userName;
	private String email;
	private String password;
	private String mobileNumber;
	private String userType;
	private String owner;


	public Nominee() {
		super();
	
	}

	Nominee(long id, String userName, String email, String password, String mobileNumber, String userType,
			String owner) {
		super();
		this.id = id;
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.mobileNumber = mobileNumber;
		this.userType = userType;
		this.owner = owner;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}
	
	
	
	
	
	

}
