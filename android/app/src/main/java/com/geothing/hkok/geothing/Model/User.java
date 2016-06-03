package com.geothing.hkok.geothing.Model;

import java.util.List;

/**
 * Created by hkok on 5/20/16.
 */

public class User {

    /**
     * Creating inner class to mirror geocache because nested geocaches does not show full user info
     */
    private class InnerGeocache {
        private String id;
        private double xCoord;
        private double yCoord;
        private String createdBy;
        private String description;
        private String name;
        private List<Object> logs;
        private String updated;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public double getxCoord() {
            return xCoord;
        }

        public void setxCoord(double xCoord) {
            this.xCoord = xCoord;
        }

        public double getyCoord() {
            return yCoord;
        }

        public void setyCoord(double yCoord) {
            this.yCoord = yCoord;
        }

        public String getCreatedBy() {
            return createdBy;
        }

        public void setCreatedBy(String createdBy) {
            this.createdBy = createdBy;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<Object> getLogs() {
            return logs;
        }

        public void setLogs(List<Object> logs) {
            this.logs = logs;
        }

        public String getUpdated() {
            return updated;
        }

        public void setUpdated(String updated) {
            this.updated = updated;
        }
    }

    private String id;
    private String username;
    private String email;
    private String memberSince;
    private List<InnerGeocache> geocachesVisited;
    private List<InnerGeocache> geocachesCreated;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMemberSince() {
        return memberSince;
    }

    public void setMemberSince(String memberSince) {
        this.memberSince = memberSince;
    }

    public List<InnerGeocache> getGeocachesVisited() {
        return geocachesVisited;
    }

    public void setGeocachesVisited(List<InnerGeocache> geocachesVisited) {
        this.geocachesVisited = geocachesVisited;
    }

    public List<InnerGeocache> getGeocachesCreated() {
        return geocachesCreated;
    }

    public void setGeocachesCreated(List<InnerGeocache> geocachesCreated) {
        this.geocachesCreated = geocachesCreated;
    }
}


