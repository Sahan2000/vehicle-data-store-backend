import { Args, Query, Resolver } from '@nestjs/graphql';
import { ExportVehicleService } from './export-vehicle.service';

@Resolver()
export class ExportVehicleResolver {
    constructor(private readonly exportVehicleService: ExportVehicleService) {}

    @Query(() => String)
    async exportVehicles(
        @Args('num') num: number,
        @Args('argument') argument: string,
    ): Promise<string> {
        const fileName = await this.exportVehicleService.getVehicles(num, argument);
        
        // Return the URL for downloading the file
        return `http://localhost:3002/static/${fileName}`;
    }
}
