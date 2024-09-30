import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsgs, setGreetMsgs] = useState([]); // Store all notes
  const [filteredMsgs, setFilteredMsgs] = useState([]); // Store filtered notes
  const [name, setName] = useState("");
  const [searchitem, setSearchItem] = useState("");

  async function greet() {
    // Fetch the greeting message
    const newGreeting = await invoke("greet", { name });

    // Append the new greeting to the array of previous messages
    setGreetMsgs((prevGreetings) => [...prevGreetings, newGreeting]);

    // Clear the input field
    setName("");
  }

  // Filter greetings based on search input
  useEffect(() => {
    if (searchitem === "") {
      // Show all notes if search is empty
      setFilteredMsgs(greetMsgs);
    } else {
      // Filter the notes based on the search term
      const filtered = greetMsgs.filter((msg) =>
        msg.toLowerCase().includes(searchitem.toLowerCase())
      );
      setFilteredMsgs(filtered);
    }
  }, [searchitem, greetMsgs]); // Re-run the effect whenever searchitem or greetMsgs changes

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      {/* Form to add a new note */}
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          value={name} // Set the input's value to the state to clear after submission
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter Your Note..."
        />
        <button type="submit">Note It</button>
      </form>

      {/* Search input */}
      <input
        id="search-input"
        value={searchitem} // Set the input's value to the state
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search Your Note..."
      />

      {/* Render the list of filtered greetings */}
      <ul className="note-list">
        {filteredMsgs.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
