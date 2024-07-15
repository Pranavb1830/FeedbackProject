package com.example.feedback;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@Service
public class FeedbackService {
    private final List<Feedback> feedbackList = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();
    
    public void addFeedback(Feedback feedback) {
        feedbackList.add(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return new ArrayList<>(feedbackList);
    }
    public void deleteFeedback(@PathVariable Long id) {
        feedbackList.removeIf(feedback -> feedback.getId().equals(id));
    }

}

