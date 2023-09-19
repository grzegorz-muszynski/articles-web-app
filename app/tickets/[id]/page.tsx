import { notFound } from "next/navigation"

export const dynamicParams = true // default val = true

// Thanks to function below performance is much better because all pages are pre-rendered and ready to be served
export async function generateStaticParams() {
    const res = await fetch(`http://localhost:4000/tickets/`);

    const tickets = await res.json();

    return tickets.map((ticket: {
        id: string,
        title: string,
        body: string,
        priority: string,
        user_email: string
    }) => {
        id: ticket.id
    })
}

// Here we have a static rendering
async function getTicket(id: number) {
    await new Promise(resolve => setTimeout(resolve, 3000)); // imitates loading

    const res = await fetch(`http://localhost:4000/tickets/` + id, {
        next: {
            revalidate: 60 // If here was a zero - the function generateStaticParams would't be needed
        }
    })

    // In case of not having any ticket with provided ID
    if (!res.ok) {
        notFound()
    }

    return res.json()
}
  
// export default async function TicketDetails({ params }: {id: number}) {
// export default async function TicketDetails({ params }: {id: string | number}) {
// export default async function TicketDetails({ params }: {}) {
export default async function TicketDetails({ params }: any) {
    const ticket = await getTicket(params.id)

    console.log(typeof { params });
    console.log(params);
    console.log( {params } );

    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
                </div>
            </div>
        </main>
    )
}