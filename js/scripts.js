export function loadFragment(fragmentUrl, placeholderId) {
    fetch(fragmentUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fragment not found');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(placeholderId).innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading fragment:', error);
        });
}

export function experienceCard() {
    fetch('./datasource/experience.json')
        .then(response => response.json())
        .then(data => {
            const experienceList = document.getElementById('experience-list');
            
            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card', 'shadow', 'border-0', 'rounded-4', 'mb-5');
                card.innerHTML = `
                    <div class="card-body p-5">
                        <div class="row align-items-center gx-5">
                            <div class="col text-center text-lg-start mb-4 mb-lg-0">
                                <div class="bg-light p-4 rounded-4">
                                    <div class="text-primary fw-bolder mb-2">${item.duration}</div>
                                    <div class="small fw-bolder">${item.position}</div>
                                    <div class="small text-muted">${item.company}</div>
                                    <div class="small text-muted">${item.location}</div>
                                </div>
                            </div>
                            <div class="col-lg-8"><div>${item.description}</div></div>
                        </div>
                    </div>
                `;
                experienceList.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading experience data:', error));
}

export function educationCard() {
    fetch('./datasource/education.json')
        .then(response => response.json())
        .then(data => {
            const experienceList = document.getElementById('education-list');
            
            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card', 'shadow', 'border-0', 'rounded-4', 'mb-5');
                card.innerHTML = `
                    <div class="card-body p-5">
                        <div class="row align-items-center gx-5">
                            <div class="col text-center text-lg-start mb-4 mb-lg-0">
                                <div class="bg-light p-4 rounded-4">
                                    <div class="text-secondary fw-bolder mb-2">2022 - 2026</div>
                                    <div class="mb-2">
                                        <div class="small fw-bolder">${item.institution}</div>
                                        <div class="small text-muted">${item.location}</div>
                                    </div>
                                    <div class="fst-italic">
                                        <div class="small text-muted">${item.degree}</div>
                                        <div class="small text-muted">${item.major}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-8"><div>${item.description}</div></div>
                        </div>
                    </div>
                `;
                experienceList.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading education data:', error));
}

export function projectCard() {
    fetch('./datasource/projects.json')
        .then((response) => response.json())
        .then((projects) => {
            const projectList = document.getElementById('project-list');

            projects.forEach((project, index) => {
                // Create carousel indicators
                const indicators = project.images.map((_, i) => `
                    <button type="button" data-bs-target="#carousel${index}" data-bs-slide-to="${i}" class="${i === 0 ? 'active' : ''}" aria-current="${i === 0 ? 'true' : ''}" aria-label="Slide ${i + 1}"></button>
                `).join('');

                // Create carousel items with modal trigger
                const carouselItems = project.images.map((image, i) => `
                    <div class="carousel-item ${i === 0 ? 'active' : ''}">
                        <img src="${image}" class="d-block project-image" alt="Project Image ${i + 1}" data-bs-toggle="modal" data-bs-target="#modal${index}${i}">
                        
                        <!-- Modal -->
                        <div class="modal fade" id="modal${index}${i}" tabindex="-1" aria-labelledby="modalLabel${index}${i}" aria-hidden="true">
                            <div class="modal-dialog modal-custom modal-dialog-centered"> <!-- Add modal-custom class -->
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="modalLabel${index}${i}">${project.name} - Image ${i + 1}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <img src="${image}" class="img-fluid full-image" alt="Project Image ${i + 1}">
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');


                // Create the project card
                const projectCard = `
                    <div class="card overflow-hidden shadow rounded-4 border-0 mb-5">
                        <div class="card-body p-0">
                            <div class="d-flex align-items-center">
                                <div class="p-5">
                                    <h2 class="fw-bolder">${project.name}</h2>
                                    <p>${project.description}</p>
                                </div>
                                <!-- Carousel -->
                                <div id="carousel${index}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="8000">
                                    <div class="carousel-indicators">
                                        ${indicators}
                                    </div>
                                    <div class="carousel-inner">
                                        ${carouselItems}
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel${index}" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carousel${index}" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Append the project card to the project list
                projectList.innerHTML += projectCard;
            });
        })
        .catch((error) => console.error('Error fetching project data:', error));
}

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate phone number
function validatePhoneNumber(phone) {
    const phoneRegex = /^(08\d{8,12}|\+62\d{8,12})$/; // Matches 08XXXXXXXXXX or +62XXXXXXXXXX
    return phoneRegex.test(phone);
}

export function validateForm(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Email and phone validation
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhoneNumber(phone);

    let message = '';

    if (isEmailValid && isPhoneValid) {
        message = 'Success! Your message has been sent.';
        // Show the validation message in the modal
        document.getElementById('validationModalMessage').innerText = message;
        const validationModal = new bootstrap.Modal(document.getElementById('validationModal'));
        validationModal.show(); // Show the modal

        // Reload the page after a brief delay
        setTimeout(() => {
            location.reload(); // Reload the page
        }, 2000); // Adjust the delay (2000ms = 2 seconds)
    } else {
        message = 'Error: ';
        if (!isEmailValid) {
            message += 'Invalid email format. ';
        }
        if (!isPhoneValid) {
            message += 'Phone number must start with 08 or +62. ';
        }

        // Show the validation message in the modal
        document.getElementById('validationModalMessage').innerText = message;
        const validationModal = new bootstrap.Modal(document.getElementById('validationModal'));
        validationModal.show(); // Show the modal
    }
}
