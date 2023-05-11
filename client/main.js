// Import elements from HTML and assign it to a variable
// const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const addFortuneBtn = document.getElementById("addFortuneButton");
const fortuneList = document.getElementById("fortune-table");

// const getCompliment = () => {
//   axios.get("http://54.82.250.44:4000/api/compliment/").then((res) => {
//     const data = res.data;
//     alert(data);
//   });
// };

// Display Fortune Table when page loads
const displayFortuneTable = async () => {
  axios.get(`http://54.82.250.44:4000/api/display`).then((res) => {
    // console.log(res.data);
    res.data.forEach((fortune, index) => {
      const row = document.createElement("tr");
      row.setAttribute("class", `row-${index}`);

      const id = document.createElement("td");
      id.textContent = index;
      row.appendChild(id);

      const text = document.createElement("td");
      text.textContent = fortune.text;
      row.appendChild(text);

      const action = document.createElement("td");
      action.setAttribute("class", "center");
      const deleteAction = document.createElement("span");
      const editAction = document.createElement("span");
      deleteAction.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    `;
      editAction.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
    `;
      deleteAction.addEventListener("click", () => {
        deleteFortune(index);
      });
      action.appendChild(deleteAction);

      editAction.addEventListener("click", () => {
        editFortune(index, fortune.text);
      });
      action.appendChild(editAction);
      row.appendChild(action);
      fortuneList.appendChild(row);
    });
  });
};

// Get Random Fortune with sweetalert2
const getFortune = () => {
  axios.get("http://54.82.250.44:4000/api/fortune/").then((res) => {
    const data = res.data;
    Swal.fire({
      title: "Your fortune",
      heightAuto: false,
      text: data,
      confirmButtonText: "OK",
    });
  });
};

// Add Fortune with sweetalert2 input field
const newFortune = () => {
  Swal.fire({
    title: "New Fortune",
    heightAuto: false,
    input: "text",
    inputPlaceholder: "Type your fortune...",
    preConfirm: (fortune) => {
      if (!fortune) {
        Swal.showValidationMessage("Fortune cannot be empty");
      } else {
        return axios
          .post("http://54.82.250.44:4000/api/fortune/", {
            fortune: fortune,
          })
          .then((res) => {
            console.log(res.data);
            location.reload();
          });
      }
    },
  });
};

// Delete Fortune with specific ID
const deleteFortune = (fortune_id) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Fortune ${fortune_id} will be deleted`,
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    heightAuto: false,
    confirmButtonText: "Delete",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://54.82.250.44:4000/api/fortune/${fortune_id}`)
        .then((res) => {
          location.reload();
        });
    }
  });
};

// Edit fortune with specific ID using sweetalert2 input box

const editFortune = (fortune_id, fortune_text) => {
  // console.log(fortune_id);
  Swal.fire({
    title: `Edit Fortune ${fortune_id}`,
    heightAuto: false,
    input: "text",
    inputValue: `${fortune_text}`,
    preConfirm: (fortune) => {
      if (!fortune) {
        Swal.showValidationMessage("Fortune cannot be empty");
      } else {
        return axios
          .put(`http://54.82.250.44:4000/api/fortune/${fortune_id}`, {
            fortune_text: fortune,
          })
          .then((res) => {
            console.log(res.data);
            location.reload();
          });
      }
    },
  });
};

// complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
addFortuneBtn.addEventListener("click", newFortune);

// Load Table when page loads
window.addEventListener("load", displayFortuneTable);
