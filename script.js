document.addEventListener("DOMContentLoaded", function () {
    fetch("https://heisen13.github.io/IT3R1_ADET_Lab5/courses.json")
        .then(response => response.json())
        .then(data => {
            const subjectsList = document.getElementById("subjects-list");
            const searchBar = document.getElementById("search-bar");
            
            function displaySubjects(filter = "") {
                subjectsList.innerHTML = "";
                const groupedCourses = {};
                
                data.courses.forEach(course => {
                    const searchString = `${course.year_level} ${course.sem} ${course.code} ${course.description}`.toLowerCase();
                    if (searchString.includes(filter.toLowerCase())) {
                        const key = `${course.year_level} Year - ${course.sem} Semester`;
                        if (!groupedCourses[key]) {
                            groupedCourses[key] = [];
                        }
                        groupedCourses[key].push(course);
                    }
                });
                
                Object.keys(groupedCourses).forEach(semester => {
                    const semesterDiv = document.createElement("div");
                    semesterDiv.innerHTML = `<h3>${semester}</h3>`;
                    
                    const ul = document.createElement("ul");
                    groupedCourses[semester].forEach(course => {
                        const li = document.createElement("li");
                        li.innerHTML = `<strong>${course.code}:</strong> ${course.description} (${course.credit} credits)`;
                        ul.appendChild(li);
                    });
                    
                    semesterDiv.appendChild(ul);
                    subjectsList.appendChild(semesterDiv);
                });
            }
            
            searchBar.addEventListener("input", () => {
                displaySubjects(searchBar.value);
            });
            
            displaySubjects();
        })
        .catch(error => {
            document.getElementById("subjects-list").textContent = "Failed to load subjects.";
            console.error("Error fetching subjects:", error);
        });
});