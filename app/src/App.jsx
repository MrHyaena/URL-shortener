import { useState } from "react";

function App() {
  const [response, setResponse] = useState(null);
  const [stats, setStats] = useState(null);
  const [path, setPath] = useState(null);
  const [clicks, setClicks] = useState(null);

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
        <div className="min-h-screen xl:px-40 grid grid-cols-2 gap-10 items-start py-20 justify-center">
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
        setResponse(json.urlShort);
        setPath(json.path);
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
            <div className="flex flex-col gap-3 text-center">
              <p>Vaše zkrácená URL je:</p>
              <a href={response} target="_blank" className="text-blue-600">
                <p>{response}</p>
              </a>
              <p>Identifikační kód odkazu pro statistiku:</p>
              <p className="text-blue-600">{path}</p>
            </div>
          </>
        )}
      </>
    );
  }

  function Statistic() {
    const [code, setCode] = useState(null);

    async function handleSUbmit() {
      const response = await fetch("http://localhost:4000/url/get/" + code, {
        method: "GET",
        mode: "cors",
      });

      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setStats(json);
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
            Pro zobrazení statistik vložte kód URL
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              className="border p-2"
            />
          </label>
          <button
            type="submit"
            className="hover:bg-blue-500 cursor-pointer p-3 bg-blue-400 text-white font-semibold "
          >
            Statistika URL
          </button>
        </form>
      </>
    );
  }

  function StatisticResponse({ stats }) {
    return (
      <>
        {stats && (
          <>
            <div className="flex flex-col gap-3 text-center">
              <p>Vaše originální URL je:</p>
              <a href={stats.urllong} target="_blank" className="text-blue-600">
                <p>{stats.urllong}</p>
              </a>
              <p>Vaše zkrácená URL je:</p>
              <a
                href={stats.urlshort}
                target="_blank"
                className="text-blue-600"
              >
                <p>{stats.urlshort}</p>
              </a>
              <p>Identifikační kód odkazu pro statistiku:</p>
              <p className="text-blue-600">{stats.path}</p>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <Header />
      <Wrapper>
        <div className="flex flex-col items-center justify-start">
          <UrlForm />
          <Response response={response} />
        </div>
        <div className="flex flex-col items-center justify-start">
          <Statistic />
          <StatisticResponse stats={stats} />
        </div>
      </Wrapper>
    </>
  );
}

export default App;
