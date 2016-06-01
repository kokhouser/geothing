package com.geothing.hkok.geothing;

import com.geothing.hkok.geothing.API.GeothingAPI;
import com.geothing.hkok.geothing.Model.AuthenticationBody;
import com.geothing.hkok.geothing.Model.Geocache;
import com.google.gson.JsonObject;

import org.junit.Test;

import java.io.IOException;
import java.util.List;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static org.junit.Assert.*;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
public class APIUnitTests {

    private static final String TEST_USERNAME = "kokhouser";
    private static final String TEST_PASSWORD = "test";

    private Retrofit getRetroFit() {
        // Uncomment following lines for log info:-
        // HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
        // interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
        // OkHttpClient client = new OkHttpClient.Builder().addInterceptor(interceptor).build();
        return new Retrofit.Builder()
                .baseUrl("http://localhost:8080/api/")
        //        .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }

    private String getToken(String username, String password) throws IOException {
        Retrofit retrofit = getRetroFit();
        GeothingAPI geothingAPI = retrofit.create(GeothingAPI.class);
        Call<JsonObject> getJson = geothingAPI.authenticateUser(new AuthenticationBody(username, password));
        JsonObject jsonObject = getJson.execute().body();
        return jsonObject.get("token").getAsString();
    }

    @Test
    public void testRetrofit_canGetToken() throws Exception {
        String token = getToken(TEST_USERNAME, TEST_PASSWORD);
        assertNotNull(token);
    }

    @Test
    public void testRetrofit_canGetAllGeocaches() throws Exception {
        Retrofit retrofit = getRetroFit();
        GeothingAPI geothingAPI = retrofit.create(GeothingAPI.class);
        Call<List<Geocache>> getAllGeocaches = geothingAPI.getAllGeocaches(getToken(TEST_USERNAME, TEST_PASSWORD));
        List<Geocache> geocacheList = getAllGeocaches.execute().body();
        assertNotNull(geocacheList);
    }

}