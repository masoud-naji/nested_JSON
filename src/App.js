import { useEffect, useState } from "react";
import "./styles.css";
import Users from "./posts";
import PostData from "./Data.json";

export default function App() {
  const [Client, SetClient] = useState("");
  const [Section, SetSection] = useState("");
  const [newLink, SetNewLink] = useState("");
  const [newPost, SetNewPost] = useState(PostData);

  const [Clientselected, setClientSelected] = useState(-1);
  const Clientvalue = Clientselected !== -1 && newPost[Clientselected];

  const [Sectionselected, setSectionSelected] = useState(-1);
  const Sectionvalue =
    Sectionselected !== -1 && newPost[Clientselected].sections[Sectionselected];

  // Add Client

  const AddClient = () => {
    if (newLink === "" && Section === "") {
      newPost.splice(newPost.length + 1, 0, {
        id: newPost.length + 1,
        name: Client,
        sections: []
      });
      SetNewPost(newPost);
    } else {
      alert("Please make sure Section and link are  blank");
    }
    SetClient("");
    SetSection("");
    SetNewLink("");
  };

  //Add Section

  const AddSection = () => {
    if (newLink === "" && Section !== "" && Clientselected !== -1) {
      newPost[Clientselected].sections.splice(
        newPost[Clientselected].sections.length + 1,
        0,
        {
          id: newPost[Clientselected].sections.length + 1,
          name: Section,
          client_id: Clientvalue.id,
          link: []
        }
      );
    } else {
      alert("Please make sure link is  blank");
    }
    SetClient("");
    SetSection("");
    SetNewLink("");
  };

  // Add Link
  const AddLink = () => {
    if (
      (Clientvalue !== "" && Sectionvalue) ||
      (Client !== "" && Section !== "" && newLink !== "")
    ) {
      newPost[Clientselected].sections[Sectionselected].link.splice(
        newPost[Clientselected].sections[Sectionselected].link.length + 1,
        0,
        {
          id: newPost[Clientselected].sections[Sectionselected].link.length + 1,
          section_id: Sectionvalue.id,
          name: newLink
        }
      );
    } else {
      alert("Please fill all the blanks");
    }
    SetClient("");
    SetSection("");
    SetNewLink("");
  };

  //Update/Edit Client
  const updateClient = (id, oldvalue, newvalue) => {
    let index = newPost.findIndex((x) => x.id === id);
    if (index !== -1) {
      let temporaryarray = newPost.slice();
      temporaryarray[index][oldvalue] = newvalue;
      SetNewPost(temporaryarray);
    } else {
      console.log("no match");
    }
    SetClient("");
  };

  //Update/Edit Section
  function UpdateSection(obj, key, val, newVal) {
    var newValue = newVal;
    var objects = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] === "object") {
        objects = objects.concat(UpdateSection(obj[i], key, val, newValue));
      } else if (i === key && obj[key] === val) {
        obj[key] = newValue;
      }
    }
    SetSection("");
    return obj;
  }

  //Delete Section
  const deleteSection = (client, section) => {
    try {
      let startindex = newPost[section.client_id - 1].sections.findIndex(
        (e) => e === newPost[section.client_id - 1].sections[section.id - 1]
      );
      newPost[section.client_id - 1].sections.splice(startindex, 1);
    } catch (error) {
      console.error(error);
    }
    SetNewPost(newPost);
    SetClient("");
    SetSection("");
    SetNewLink("");
  };
  //Delete Links
  const deleteLink = (section, link) => {
    try {
      let startindex = newPost[section.client_id - 1].sections[
        section.id - 1
      ].link.findIndex(
        (e) =>
          e ===
          newPost[section.client_id - 1].sections[section.id - 1].link[
            link.id - 1
          ]
      );
      newPost[section.client_id - 1].sections[section.id - 1].link.splice(
        startindex,
        1
      );
    } catch (error) {
      console.error(error);
    }
    SetNewPost(newPost);
    SetClient("");
    SetSection("");
    SetNewLink("");
  };
  //////////////////
  useEffect(() => {
    SetNewPost(newPost);
  }, [Clientvalue, Sectionvalue, Section, newPost]);

  return (
    <div className="App">
      <h1>List of Clients , sections and links</h1>
      <h2>test of nested JSON </h2>
      {/* ------------------------------------------------------Add/Edit Client------------------------------------ */}
      <label>Add New Client or Choose one: </label>

      <select
        onChange={(e) => {
          setClientSelected(e.target.value);
          setSectionSelected(-1);
          SetSection("");
          SetNewLink("");
        }}
        value={Clientselected}
      >
        <option>Selected Client</option>
        {newPost.map((m, ic) => {
          return (
            <option key={m.id} value={ic} Text={m.name}>
              {m.name}
            </option>
          );
        })}
        ;
      </select>
      <input
        type="Text"
        value={Client}
        onChange={(e) => {
          SetClient(e.target.value);
        }}
      />
      {/* ------------Add Client --------- */}
      <button
        style={{ padding: ".1rem 2rem .1rem 2rem", margin: "1rem" }}
        onClick={() => AddClient()}
        disabled={
          (Clientvalue && Clientvalue.id === "") ||
          (Client !== "" && Section === "" && newLink === "")
            ? false
            : true
        }
      >
        Add
      </button>
      {/* ------------Edit Client --------- */}
      <button
        style={{ padding: ".1rem 2rem .1rem 2rem", margin: "1rem" }}
        onClick={() =>
          Clientvalue && updateClient(Clientvalue.id, "name", Client)
        }
        disabled={
          Clientvalue !== "" &&
          Client !== "" &&
          Section === "" &&
          newLink === ""
            ? false
            : true
        }
      >
        Edit
      </button>

      <hr style={{ width: "50%" }} />
      {/* ------------------------------------------------------Add/Edit Section------------------------------------ */}

      <label>Add New Section : </label>
      {Clientvalue && (
        <select
          onChange={(e) => {
            setSectionSelected(e.target.value);
          }}
          value={Sectionselected}
        >
          {Clientvalue &&
            newPost
              .filter((user) => user.name === Clientvalue.name && user.sections)
              .map((postClient) => {
                return (
                  <>
                    <option>Selected Section</option>
                    {postClient.sections.map((m, ic) => {
                      return (
                        <option key={m.id} value={ic}>
                          {m.name}
                        </option>
                      );
                    })}
                    ;
                  </>
                );
              })}
        </select>
      )}

      <input
        type="Text"
        value={Section}
        onChange={(e) => {
          SetSection(e.target.value);
        }}
      />

      {/* ------------Add Section --------- */}
      <button
        style={{ padding: ".1rem 2rem .1rem 2rem", margin: "1rem" }}
        onClick={() => AddSection()}
        disabled={
          (Sectionselected === -1 || Sectionselected === "Selected Section") &&
          Section !== "" &&
          Clientselected !== -1 &&
          Clientselected !== "Selected Client" &&
          Clientvalue !== false &&
          Client === "" &&
          newLink === ""
            ? false
            : true
        }
      >
        Add
      </button>

      {/* ------------Edit Section --------- */}
      <button
        style={{ padding: ".1rem 2rem .1rem 2rem", margin: "1rem" }}
        onClick={() => {
          Section !== "" &&
            Sectionvalue &&
            UpdateSection(newPost, "name", Sectionvalue.name, Section);
        }}
        disabled={
          Sectionvalue !== "" && Section !== "" && newLink === "" ? false : true
        }
      >
        Edit
      </button>

      {/* ------------------------------------------------------Add/Edit Link------------------------------------ */}
      <hr style={{ width: "50%" }} />
      <br />
      <label> Add New Link : </label>

      <input
        type="Text"
        value={newLink}
        onChange={(e) => SetNewLink(e.target.value)}
      />

      <button
        style={{ padding: ".1rem 2rem .1rem 2rem", margin: "1rem" }}
        onClick={() => AddLink()}
        disabled={
          Sectionselected !== -1 &&
          Sectionselected !== "Selected Section" &&
          Section === "" &&
          Clientselected !== -1 &&
          Clientselected !== "Selected Client" &&
          Clientvalue !== false &&
          Client === "" &&
          newLink !== ""
            ? false
            : true
        }
      >
        Add
      </button>
      <hr />

      <div className="Clientdiv">
        <Users
          newPost={newPost}
          deleteSection={(client, section) => deleteSection(client, section)}
          deleteLink={(section, link) => deleteLink(section, link)}
        />
      </div>
    </div>
  );
}
