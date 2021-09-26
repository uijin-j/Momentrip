package com.highfive.momentrip;
import java.sql.Date;

public class Moment {
    int moment_id;
    String title; // 앞면에 적는 것
    String content; //뒷면에 적는 것
    String img;
    Date created_at;
    Date updated_id;
    int user_id;
    int book_id;
    Boolean moment_public; //공개범위

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public int getBook_id() {
        return book_id;
    }

    public void setBook_id(int book_id) {
        this.book_id = book_id;
    }

    public Boolean getMoment_public() {
        return moment_public;
    }

    public void setMoment_public(Boolean moment_public) {
        this.moment_public = moment_public;
    }

    public int getMoment_id() {
        return moment_id;
    }

    public void setMoment_id(int moment_id) {
        this.moment_id = moment_id;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdated_id() {
        return updated_id;
    }

    public void setUpdated_id(Date updated_id) {
        this.updated_id = updated_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
