import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolover {
    @Query(() => String)
    helloTest() {
        return "bye";
    }
}