import CreateForm from "./CreateForm";

// The page is a server component but CreateForm is a client component
export default function CreateTicket() {
  return (
    <main>
      <h2 className="text-primary text-center">Add a New Ticket</h2>
      <CreateForm />
    </main>
  )
}
