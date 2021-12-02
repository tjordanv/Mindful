package com.techelevator.dao;

import com.techelevator.model.RegisterUserDTO;
import com.techelevator.model.User;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.text.SimpleDateFormat;
import java.util.Date;

public class JdbcUserDaoTests extends FinalCapstoneDaoTests {

    private JdbcUserDao sut;

    @Before
    public void setup() {
        DataSource dataSource = this.getDataSource();
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        sut = new JdbcUserDao(jdbcTemplate);
    }

    @Test
    public void createNewUser() {
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String dateStr = formatter.format(date);

        RegisterUserDTO newUser = new RegisterUserDTO("FIRST_NAME", "LAST_NAME",
                date, "MISSION STATEMENT", "CITY", "PA",
                "EMAIL@TEST.COM", "1234567890","TEST_USER", "PASSWORD",
                "PASSWORD", "ROLE_USER");
        boolean userCreated = sut.create(newUser);
        Assert.assertTrue(userCreated);
        User user = sut.findByUsername("TEST_USER");
        Assert.assertEquals("TEST_USER", user.getUsername());
    }

}
