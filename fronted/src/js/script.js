// ============================================
// AGRIFLOW - MEMBER 2
// CROP MANAGEMENT
// ============================================

const API_URL = "http://localhost:5000/api/crops";

const USER_ID = "demo-user";


// ============================================
// ADD CROP
// ============================================

const addCropForm = document.getElementById("addCropForm");

if (addCropForm) {

    addCropForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name =
            document.getElementById("cropName").value.trim();

        const category =
            document.getElementById("category").value.trim();

        const quantity =
            document.getElementById("quantity").value.trim();

        const unit =
            document.getElementById("unit").value.trim();


        if (
            name === "" ||
            category === "" ||
            quantity === "" ||
            unit === ""
        ) {
            alert("Please fill all fields.");
            return;
        }


        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-user-id": USER_ID
                },

                body: JSON.stringify({
                    name: name,
                    category: category,
                    quantity: Number(quantity),
                    unit: unit
                })

            });


            const data = await response.json();


            if (!response.ok) {

                alert(
                    data.message || "Failed to add crop."
                );

                return;
            }


            alert("Crop added successfully!");


            window.location.href =
                "myproduce.html";


        } catch (error) {

            console.error(error);

            alert(
                "Cannot connect to backend. Please make sure the server is running."
            );

        }

    });

}


// ============================================
// MY PRODUCE
// ============================================

const produceList =
    document.getElementById("produceList");


if (produceList) {

    displayCrops();

}


async function displayCrops() {

    try {

        const response = await fetch(API_URL, {

            method: "GET",

            headers: {
                "x-user-id": USER_ID
            }

        });


        const crops =
            await response.json();


        if (!response.ok) {

            produceList.innerHTML = `
                <div class="card empty-state">
                    <h2>Failed to load crops</h2>
                    <p>Please try again.</p>
                </div>
            `;

            return;
        }


        produceList.innerHTML = "";


        if (crops.length === 0) {

            produceList.innerHTML = `
                <div class="card empty-state">

                    <h2>
                        No crops added yet
                    </h2>

                    <p>
                        Add your first crop.
                    </p>

                </div>
            `;

            return;
        }


        crops.forEach(function (crop) {

            const card =
                document.createElement("div");


            card.className =
                "card produce-card";


            card.innerHTML = `

                <div class="produce-info">

                    <h2>
                        ${crop.name}
                    </h2>

                    <p>
                        <strong>Category:</strong>
                        ${crop.category}
                    </p>

                    <p>
                        <strong>Quantity:</strong>
                        ${crop.quantity} ${crop.unit}
                    </p>

                </div>


                <div class="produce-actions">

                    <button
                        class="btn primary-btn"
                        onclick="viewCrop('${crop._id}')">
                        View
                    </button>


                    <button
                        class="btn danger-btn"
                        onclick="deleteCrop('${crop._id}')">
                        Delete
                    </button>

                </div>

            `;


            produceList.appendChild(card);

        });


    } catch (error) {

        console.error(error);

        produceList.innerHTML = `
            <div class="card empty-state">

                <h2>
                    Backend connection failed
                </h2>

                <p>
                    Please make sure the backend server is running.
                </p>

            </div>
        `;

    }

}


// ============================================
// VIEW CROP
// ============================================

function viewCrop(id) {

    localStorage.setItem(
        "selectedCropId",
        id
    );


    window.location.href =
        "cropdetails.html";

}


// ============================================
// CROP DETAILS
// ============================================

const cropDetails =
    document.getElementById("cropDetails");


if (cropDetails) {

    showCropDetails();

}


async function showCropDetails() {

    const selectedId =
        localStorage.getItem(
            "selectedCropId"
        );


    if (!selectedId) {

        cropDetails.innerHTML = `

            <h2>
                Crop not found
            </h2>

            <a
                href="myproduce.html"
                class="btn primary-btn">
                Back to My Produce
            </a>

        `;

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${selectedId}`,
                {
                    method: "GET",

                    headers: {
                        "x-user-id": USER_ID
                    }
                }
            );


        const crop =
            await response.json();


        if (!response.ok) {

            cropDetails.innerHTML = `

                <h2>
                    Crop not found
                </h2>

                <a
                    href="myproduce.html"
                    class="btn primary-btn">
                    Back to My Produce
                </a>

            `;

            return;
        }


        document.getElementById(
            "cropName"
        ).textContent =
            crop.name;


        document.getElementById(
            "cropCategory"
        ).textContent =
            crop.category;


        document.getElementById(
            "cropQuantity"
        ).textContent =
            crop.quantity;


        document.getElementById(
            "cropUnit"
        ).textContent =
            crop.unit;


    } catch (error) {

        console.error(error);

        cropDetails.innerHTML = `

            <h2>
                Backend connection failed
            </h2>

            <a
                href="myproduce.html"
                class="btn primary-btn">
                Back to My Produce
            </a>

        `;

    }

}


// ============================================
// DELETE CROP
// ============================================

async function deleteCrop(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this crop?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "x-user-id": USER_ID
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to delete crop."
            );

            return;
        }


        alert(
            "Crop deleted successfully!"
        );


        displayCrops();


    } catch (error) {

        console.error(error);

        alert(
            "Cannot connect to backend."
        );

    }

}


// ============================================
// VOICE INPUT
// ============================================

function startVoiceInput(inputId) {

    if (!("webkitSpeechRecognition" in window)) {

        alert(
            "Voice input is not supported in this browser."
        );

        return;
    }


    const recognition =
        new webkitSpeechRecognition();


    recognition.lang =
        "en-IN";


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    recognition.start();


    recognition.onresult =
        function (event) {

            const text =
                event.results[0][0].transcript;


            const input =
                document.getElementById(inputId);


            if (input.tagName === "SELECT") {

                const options =
                    Array.from(input.options);


                const matchingOption =
                    options.find(function (option) {

                        return option.text
                            .toLowerCase()
                            .includes(
                                text.toLowerCase()
                            );

                    });


                if (matchingOption) {

                    input.value =
                        matchingOption.value;

                }

            } else {

                input.value =
                    text;

            }

        };


    recognition.onerror =
        function () {

            alert(
                "Voice input failed. Please try again."
            );

        };

}