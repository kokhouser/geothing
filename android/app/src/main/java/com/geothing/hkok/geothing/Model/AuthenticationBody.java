package com.geothing.hkok.geothing.Model;

/**
 * Created by hkok on 5/20/16.
 */

/**
 * Class to store credentials for API authentication
 */
public class AuthenticationBody {
    private String username;
    private String password;

    public AuthenticationBody(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
