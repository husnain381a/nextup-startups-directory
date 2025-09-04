import { client } from "@/sanity/lib/client"
import Ping from "./Ping"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import {after as after} from 'next/server'

//CATCHING ID AS A PROP FROM THE STARTUP COMPONENT, TO SHOW VIEWS FOR EACH STARTUP
const View = async ({ id }: { id: string }) => {

    //TO FETCH VIEWS FROM SANITY
    const { views: totalViews } = await client
  .withConfig({ useCdn: false })
  .fetch(STARTUP_VIEWS_QUERY, { id });

  //TO INCREMENT VIEWS IN SANITY after the page load
  after(
  async()=> await writeClient.patch(id).set({views: totalViews + 1}).commit()
  )

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  )
}

export default View
