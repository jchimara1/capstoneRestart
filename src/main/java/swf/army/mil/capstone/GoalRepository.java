package swf.army.mil.capstone;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swf.army.mil.capstone.entity.Goal;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
}
