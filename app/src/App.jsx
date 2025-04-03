import { useState } from "react";

function App() {
  const [response, setResponse] = useState(null);

  function Header() {
    return (
      <>
        <div className="w-full h-[70px] bg-blue-200"></div>
      </>
    );
  }

  function Wrapper({ children }) {
    return (
      <>
        <div className="min-h-screen xl:px-40 flex flex-col gap-10 items-center justify-center">
          {children}
        </div>
      </>
    );
  }

  function UrlForm() {
    const [url, setUrl] = useState("");

    async function handleSUbmit() {
      console.log(JSON.stringify({ urlLong: url }));
      const response = await fetch("http://localhost:4000/url/create", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urlLong: url }),
      });

      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setResponse(json);
      }
    }

    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSUbmit();
          }}
          className="flex flex-col gap-5"
        >
          <label className="flex flex-col text-lg gap-3">
            Vložte URL, kterou chcete zkrátit
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              className="border p-2"
            />
          </label>
          <button
            type="submit"
            className="hover:bg-blue-500 cursor-pointer p-3 bg-blue-400 text-white font-semibold "
          >
            Zkrátit URL
          </button>
        </form>
      </>
    );
  }

  function Response({ response }) {
    return (
      <>
        {response && (
          <>
            <p>Vaše zkrácená URL je:</p>
            <a href={response} target="_blank">
              <p>{response}</p>
            </a>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <Header />
      <Wrapper>
        <UrlForm />
        <Response response={response} />
      </Wrapper>
    </>
  );
}

export default App;
