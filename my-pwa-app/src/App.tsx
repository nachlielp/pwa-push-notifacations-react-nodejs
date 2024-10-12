import PushNotificationButton from "./PushNotificationButton";

function App() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Get Notified</h1>
      <div className="card">
        <PushNotificationButton />
      </div>
    </section>
  );
}

export default App;
