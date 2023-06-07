// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the [Open Workout] button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on [x], close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere but the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// == Getting Day of the Week == 
document.addEventListener("DOMContentLoaded", () => {
    const date = document.querySelector("#date");

    updateDate(date);
    setInterval(() => updateDate(date), 10000);
});

const updateDate = (date) => {
    var now = new Date();

    const dateFormatter = new Intl.DateTimeFormat("en-UK", {
        // en-UK = Day/Month/Year 👍 "Sunday the 2nd of Febuary"; Smallest to Largest (Week day, day of the month, month, year)
        // en-US = Month/Day/Year 🤮 "Sunday Febuary 2nd"
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const dateString = dateFormatter.format(now);
    date.textContent = dateString;

    // == Content for the Type of Day ==
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayOfWeek = new Date().getDay();
    const workoutDayIndex = currentDayOfWeek; // I have a 5-day workout routine (...maybe I should implement Sat = Leg... later)

    const workoutDays = ['Day off!', 'Push', 'Pull', 'Leg', 'Push', 'Pull', 'Day off!']; // Monday & Thursday = Push & Tuesday, Friday = Pull, Wednesday = Leg
    const workoutDay = workoutDays[currentDayOfWeek];
    document.getElementById('pushPullLeg').innerHTML = workoutDay + ' Day:'; // Format = Push Day / Pull Day / Leg Day
    document.getElementById('dayOfWeekModal').innerHTML = daysOfWeek[currentDayOfWeek];

    switch (workoutDayIndex) {
        case 0:
            document.getElementById('day-text').innerHTML = '<form><input type="checkbox" id="walk1" name="walk1" value="walk1"><label for="walk1">Go for a walk and enjoy.</label></form>';
            break;
        case 1:
            document.getElementById('day-text').innerHTML = '<form><input type="checkbox" id="bench1" name="bench1" value="bench1"><label for="bench1">Bench Press (3 sets of 8-12 reps)</label><br><input type="checkbox" id="dbSP1" name="dbSP1" value="dbSP1"><label for="dbSP1">Dumbbell Shoulder Press (3 sets of 8-12 reps)</label><br><input type="checkbox" id="incDBP1" name="incDBP1" value="incDBP1"><label for="incDBP1">Incline Dumbbell Press (3 sets of 8-12 reps)</label><br><input type="checkbox" id="tDip1" name="tDip1" value="tDip1"><label for="tDip1">Tricep Dips (3 sets of 8-12 reps)</label><br><input type="checkbox" id="latRaise1" name="latRaise1" value="latRaise1"><label for="latRaise1">Lateral Raises (3 sets of 8-12 reps)</label></form>';
            break;
        case 2:
            document.getElementById('day-text').innerHTML = '<form><input type="checkbox" id="dLift1" name="dLift1" value="dLift1"><label for="dLift1">Deadlift (3 sets of 8-12 reps)</label><br><input type="checkbox" id="pUp1" name="pUp1" value="pUp1"><label for="pUp1">Pull-Ups (3 sets of 8-12 reps)</label><br><input type="checkbox" id="bbRows1" name="bbRows1" value="bbRows1"><label for="bbRows1">Barbell Rows (3 sets of 8-12 reps)</label><br><input type="checkbox" id="bhCurls1" name="bhCurls1" value="bhCurls1"><label for="bhCurls1">Bicep Curls or Hammer Curls (3 sets of 8-12 reps)</label><br><input type="checkbox" id="fPull1" name="fPull1" value="fPull1"><label for="fPull1">Face Pulls (3 sets of 8-12 reps)</label></form>';
            break;
        case 3:
            document.getElementById('day-text').innerHTML = '<form><input type="checkbox" id="squat1" name="squat1" value="squat1"><label for="squat1">Squats (3 sets of 8-12 reps)</label><br><input type="checkbox" id="lunge1" name="lunge1" value="lunge1"><label for="lunge1">Lunges (3 sets of 8-12 reps)</label><br><input type="checkbox" id="lExten1" name="lExten1" value="lExten1"><label for="lExten1">Leg Extension (3 sets of 8-12 reps)</label><br><input type="checkbox" id="lCurl1" name="lCurl1" value="lCurl1"><label for="lCurl1">Leg Curls (3 sets of 8-12 reps)</label><br><input type="checkbox" id="sCalfRaise1" name="sCalfRaise1" value="sCalfRaise1"><label for="sCalfRaise1">Standing Calf Raises (3 sets of 8-12 reps)</label></form>';
            break;
        case 4:
            document.getElementById('day-text').innerHTML = '<form><input type="checkbox" id="bench2" name="bench2" value="bench2"><label for="bench2">Bench Press (3 sets of 8-12 reps)</label><br><input type="checkbox" id="dbSP2" name="dbSP2" value="dbSP2"><label for="dbSP2">Dumbbell Shoulder Press (3 sets of 8-12 reps)</label><br><input type="checkbox" id="incDBP2" name="incDBP2" value="incDBP2"><label for="incDBP2">Incline Dumbbell Press (3 sets of 8-12 reps)</label><br><input type="checkbox" id="tDip2" name="tDip2" value="tDip2"><label for="tDip2">Tricep Dips (3 sets of 8-12 reps)</label><br><input type="checkbox" id="latRaise2" name="latRaise2" value="latRaise2"><label for="latRaise2">Lateral Raises (3 sets of 8-12 reps)</label></form>';
            break;
        case 5:
            document.getElementById('day-text').innerHTML = '<form><input type="checkbox" id="dLift2" name="dLift2" value="dLift2"><label for="dLift2">Deadlift (3 sets of 8-12 reps)</label><br><input type="checkbox" id="pUp2" name="pUp2" value="pUp2"><label for="pUp2">Pull-Ups (3 sets of 8-12 reps)</label><br><input type="checkbox" id="bbRows2" name="bbRows2" value="bbRows2"><label for="bbRows2">Barbell Rows (3 sets of 8-12 reps)</label><br><input type="checkbox" id="bhCurls2" name="bhCurls2" value="bhCurls2"><label for="bhCurls2">Bicep Curls or Hammer Curls (3 sets of 8-12 reps)</label><br><input type="checkbox" id="fPull2" name="fPull2" value="fPull2"><label for="fPull2">Face Pulls (3 sets of 8-12 reps)</label></form>';
            break;
        case 6:
            document.getElementById('day-text').innerHTML = '<form><input type="checkbox" id="walk2" name="walk2" value="walk2"><label for="walk2">Go for a walk and enjoy.</label></form>';
            break;
    }
};