import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"
import { Response , Request} from "express"

export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    req: Request & { session?: Express.SessionStore }
    res: Response
}