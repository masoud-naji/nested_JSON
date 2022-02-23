import { useEffect, useState } from "react";

const Users = (props) => {
  const [ClientData, setClientData] = useState(props.newPost);
  const [EnableD, setEnableD] = useState(false);

  useEffect(() => {
    console.log("ClientData", ClientData);
  }, [ClientData, props]);

  return (
    <div>
      <div>
        <ul>
          <li>Client can have many sections</li>
          <li>Section can have only 1 client / section can have many link</li>
          <li>Link can have only 1 section</li>
        </ul>
      </div>
      <hr />
      <button
        style={{
          background: "red"
        }}
        onClick={() => setEnableD(!EnableD)}
      >
        {EnableD ? "Done!" : "Delete"}
      </button>
      <ul>
        <h3>Data Structure :</h3>
        <li>clients : id, name</li>
        <ul>
          {" "}
          <li>sections: id, client_id, name</li>{" "}
          <ul>
            <li>links: id, section_id, name</li>
          </ul>{" "}
        </ul>
      </ul>
      <hr style={{ width: "30%" }} />

      <br />

      {ClientData.map((client) => {
        return (
          <div style={{ textAlign: "left" }}>
            <li key={client.id}>
              {EnableD && (
                <button
                  className="delete"
                  onClick={(e) =>
                    setClientData(ClientData.filter((e) => e !== client))
                  }
                >
                  X
                </button>
              )}
              <strong style={{ color: "red" }}>Client # {client.id}: </strong>

              {client.name}
              <ul>
                {client.sections &&
                  client.sections.map((section) => {
                    return (
                      <li key={section.id}>
                        <strong style={{ color: "blue" }}>
                          {EnableD && (
                            <button
                              className="delete"
                              onClick={() => {
                                props.deleteSection(client, section);
                                setEnableD(false);
                              }}
                            >
                              X
                            </button>
                          )}
                          Section # {section.id}:
                        </strong>
                        {section.name}
                        <ul>
                          {section.link &&
                            section.link.map((link) => {
                              return (
                                <li key={link.id}>
                                  {EnableD && (
                                    <button
                                      className="delete"
                                      onClick={() => {
                                        props.deleteLink(section, link);
                                        setEnableD(false);
                                      }}
                                    >
                                      X
                                    </button>
                                  )}
                                  <strong>Link # {link.id} : </strong>
                                  {link.name}
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    );
                  })}
              </ul>
            </li>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
