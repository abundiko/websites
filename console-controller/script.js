const body = document.body;
const title = document.querySelector("#title");
const description = document.querySelector("#description");

function setTheme(theme) {
  if (!theme) return setTheme("light");
  const value = theme.toString().trim().toLowerCase();
  if (value === "light" || value === "") {
    body.classList.remove("dark");
    body.classList.add("light");
  } else if (value === "dark") {
    body.classList.remove("light");
    body.classList.add("dark");
  } else {
    console.error("invalid parameter. use 'light' or 'dark'");
  }
}

function setFontColor(color) {
  if (!color) {
    title.style.color = "";
    description.style.color = "";
    return;
  }
  const value = color.toString().trim().toLowerCase();
  title.style.color = value;
  description.style.color = value;
}

function setTitle(str) {
  if (!str) return (title.textContent = `Console Controller`);
  title.textContent = str;
}
function setDescription(str) {
  if (!str)
    return (description.innerHTML = `
  <b>open the console and try:</b>
      <br>
      <i>setFontColor('red')</i><br>
      <i>setBackgroundColor('blue')</i><br>
      <i>setTheme('dark')</i><br>
      <i>setTitle('New Title')</i><br>
      <i>setDescription('The new description :)')</i><br>
      <br>
      <br>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ipsam tenetur
      obcaecati, neque at dicta
      corporis officiis natus vero, commodi ut doloribus quis. Itaque voluptatum architecto sapiente commodi impedit
      eveniet delectus suscipit, modi, quisquam ea accusantium aut fuga incidunt labore.
      <br>
      <br>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ipsam tenetur
      obcaecati, neque at dicta
      corporis officiis natus vero, commodi ut doloribus quis. Itaque voluptatum architecto sapiente commodi impedit
      eveniet delectus suscipit, modi, quisquam ea accusantium aut fuga incidunt labore.
        eveniet delectus suscipit, modi, quisquam ea accusantium aut fuga incidunt labore.
  `);
  description.textContent = str;
}

function setBackgroundColor(color) {
  if (!color) {
    body.style.backgroundColor = "";
    return;
  }
  const value = color.toString().trim().toLowerCase();
  body.style.backgroundColor = value;
}
