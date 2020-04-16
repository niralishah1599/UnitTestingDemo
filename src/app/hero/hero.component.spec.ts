import { HeroComponent } from "./hero.component"
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";


describe('Hero Component (shallow test)', ()=>{

  let fixture:ComponentFixture<HeroComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
        declarations:[HeroComponent],
        schemas:[NO_ERRORS_SCHEMA]//it is ignore undefined template attributes and tags
    });
    fixture=TestBed.createComponent(HeroComponent);

  })

    it('should have the correct hero',()=>{
        fixture.componentInstance.hero={id:1,name:'nirali',strength:2}
        expect(fixture.componentInstance.hero.name).toEqual('nirali');
    })

    it('should render the hero name in an anchor tag',()=>{
        fixture.componentInstance.hero={id:1,name:'nirali',strength:2};
        fixture.detectChanges();//this is used for binding ts variable
        //debug element
        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('nirali')

        //native element
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('nirali');
    })
 
})