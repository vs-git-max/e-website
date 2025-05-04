import React from "react";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import { Button } from "@/components/ui/button";
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Footprints, Shirt, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {

const slides = [image1, image2, image3];
const categories =  [
  { id: "men", label: "Men", icon: Shirt },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon},
  { id: "accessories", label: "Accessories", icon:  WatchIcon},
  { id: "footware", label: "Footware", icon: Footprints },
]

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">{
        
        
        slides.map((slide,index)=> (<img key={index} src={slide} className={'absolute top-0 left-0 w-full object-cover transition-opacity duration-1000'} />))
        
        }
        

        <Button variant='outline' size='icon' className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'>
          <ChevronLeftIcon className="size-4"/>
        </Button>

        <Button variant='outline' size='icon' className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'>
          <ChevronRightIcon className="size-4"/>
        </Button>
        
        
        
        </div>

<section className="py-12 bg-gray-50">
  <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {
            categories.map(item=><Card className='cursor-pointer hover:shadow-lg transition-all duration-300'>
        <CardContent className='flex flex-col items-center justify-center p-6'>
        <item.icon className="size-12 mb-4 text-primary"/>
        </CardContent>
            </Card>)
          }
        </div>
    </div>
        </section>

  );
};

export default Home;
