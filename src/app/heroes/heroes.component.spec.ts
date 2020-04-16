import { HeroesComponent } from "./heroes.component"

import { of } from "rxjs";

describe('Heroes Component (isolation Test)',()=>{
    let Component;
    let MockService;
    
    let Heroes;
    beforeEach(()=>{
        Heroes=[
            {id:1,name:'nirali',strength:2},
            {id:2,name:'rajat',strength:5},
            {id:3,name:'rahul',strength:8},
        ]

        MockService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
        Component = new HeroesComponent(MockService);

    })

    describe('delete',()=>{
        it('should remove the indicating hero from the heroes list',()=>{
            MockService.deleteHero.and.returnValue(of(true));
           Component.heroes= Heroes;
           Component.delete(Heroes[2]);
           expect(Component.heroes.length).toBe(2);
        })

        it('should delete call',()=>{
            MockService.deleteHero.and.returnValue(of(true));
           Component.heroes= Heroes;
           Component.delete(Heroes[2]);
           expect(MockService.deleteHero).toHaveBeenCalled();
        })

        it('should delete call with the correct hero',()=>{
            MockService.deleteHero.and.returnValue(of(true));
           Component.heroes= Heroes;
           Component.delete(Heroes[2]);
           expect(MockService.deleteHero).toHaveBeenCalledWith(Heroes[2]);
        })

      

    })

    describe('add',()=>{
       it('should add the indicating hero from the heroes list',()=>{
        MockService.addHero.and.returnValue(of(true));
        Component.heroes= Heroes;
        Component.add('priya');
        expect(Component.heroes.length).toBe(4);
       })
       it('should call add with the correct hero',()=>{
        MockService.addHero.and.returnValue(of(true));
        Component.heroes= Heroes;
        let addHero={name:'priya',strength:11};
        MockService.addHero(addHero);
       expect(MockService.addHero).toHaveBeenCalledWith(addHero);
       })
     
    })
    
})

