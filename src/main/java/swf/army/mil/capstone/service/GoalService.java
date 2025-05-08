package swf.army.mil.capstone.service;

import org.springframework.stereotype.Service;
import swf.army.mil.capstone.GoalRepository;
import swf.army.mil.capstone.entity.Goal;

import java.util.List;

@Service
public class GoalService {
    private final GoalRepository goalRepository;

    public GoalService(GoalRepository goalrepository){
        this.goalRepository = goalrepository;
    }

    public List<Goal> fetchGoals(){
        List<Goal> list = goalRepository.findAll();
        System.out.println(" Habit Service returned " + list.size() + " Habit");
        return list;
    }

    public Goal createGoal(Goal newGoal){
        return goalRepository.save(newGoal);
    }


    public String deleteGoalById(Long id) {
        if (goalRepository.existsById(id)){
            goalRepository.deleteById(id);
            return "Item deleted.";
        }
        return "Item not found.";
    }


}
