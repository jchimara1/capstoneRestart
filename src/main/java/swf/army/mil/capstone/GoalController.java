package swf.army.mil.capstone;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swf.army.mil.capstone.entity.Goal;
import swf.army.mil.capstone.service.GoalService;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:5173")
public class GoalController {

    private final GoalService goalService;
    private final GoalRepository goalRepository;

    public GoalController(GoalService goalService, GoalRepository goalRepository) {
        this.goalService = goalService;
        this.goalRepository = goalRepository;
    }

    @GetMapping
    public ResponseEntity<List<Goal>> GetAllGoals(){
        List<Goal> goals = goalService.fetchGoals();
        return ResponseEntity.ok(goals);
    }

    @PostMapping
    public ResponseEntity<Goal> AddGoal(@RequestBody Goal newGoal){
        Goal userGoal = goalService.createGoal(newGoal);
        return ResponseEntity.ok(userGoal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Goal> updateGoal(@PathVariable Long id, @RequestBody Goal updatedGoal) throws Exception {
        Goal existingGoal = goalRepository.findById(id)
                .orElseThrow(() -> new Exception("Goal doesn't exist: " + id));

        // Set all fields from the updatedGoal
        existingGoal.setTitle(updatedGoal.getTitle());
        existingGoal.setDescription(updatedGoal.getDescription());
        existingGoal.setStartDate(updatedGoal.getStartDate());
        existingGoal.setDeadline(updatedGoal.getDeadline());
        existingGoal.setComplete(updatedGoal.getComplete());
        existingGoal.setLongTerm(updatedGoal.getLongTerm());
        existingGoal.setNotes(updatedGoal.getNotes());

        goalRepository.save(existingGoal);
        return ResponseEntity.ok(existingGoal);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGoal(@PathVariable Long id) {
        if (!goalRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Goal with ID " + id + " not found.");
        }

        goalRepository.deleteById(id);
        return ResponseEntity.ok("Goal with ID " + id + " has been deleted.");
    }

}
