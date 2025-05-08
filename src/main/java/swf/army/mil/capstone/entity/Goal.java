package swf.army.mil.capstone.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Goal {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String title;
    private String description;
    private Date deadline;
    private Date StartDate;

    @Column(name = "is_complete")
    @JsonProperty("complete")
    private Boolean isComplete;

    @Column(name = "is_long_term")
    @JsonProperty("longterm")
    private Boolean isLongTerm;

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    private String notes;






    public Boolean getLongTerm() {
        return isLongTerm;
    }

    public void setLongTerm(Boolean longTerm) {
        isLongTerm = longTerm;
    }

    public Boolean getComplete() {
        return isComplete;
    }

    public void setComplete(Boolean complete) {
        isComplete = complete;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Goal() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public Date getStartDate() {
        return StartDate;
    }

    public void setStartDate(Date startDate) {
        StartDate = startDate;
    }


    public Goal(Long id, String title, String description, Date deadline, Date startDate, Boolean isComplete, Boolean isLongTerm, String notes) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        StartDate = startDate;
        this.isComplete = isComplete;
        this.isLongTerm = isLongTerm;
        this.notes = notes;
    }
}
