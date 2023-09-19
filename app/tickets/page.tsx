import { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";

export default function Tickets() {
  return (
    <main>
      <nav> {/* nav makes margin top and bottom 40px */}
        <div>
          <h2>Tickets</h2>
          <p><small>Currently open tickets.</small></p>
        </div>
      </nav>

      {/* Before using Suspense - h2 a paragraph above were hidden while loading */}
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  )
}