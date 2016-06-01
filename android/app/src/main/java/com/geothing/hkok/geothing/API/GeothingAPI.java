package com.geothing.hkok.geothing.API;

import com.geothing.hkok.geothing.Model.AuthenticationBody;
import com.geothing.hkok.geothing.Model.Geocache;
import com.google.gson.JsonObject;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

/**
 * Created by hkok on 5/20/16.
 */

public interface GeothingAPI {
    @POST("authenticate")
    Call<JsonObject> authenticateUser(@Body AuthenticationBody authenticationBody);

    @GET("geocaches")
    Call<List<Geocache>> getAllGeocaches(@Header("x-access-token") String token);
}
