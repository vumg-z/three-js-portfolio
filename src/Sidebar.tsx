import React from 'react';
import Card from "./Card"

const Sidebar = () => {
    return (
        <div className="sidebar-container text-white text-center p-5 space-y-4 font-plex-mono">
            <h2 className="text-3xl  font-regular">Victor Mendoza</h2>
            <p className=" font-extralight">+52 33-21-30-37-83</p>
            <p className='font-extralight'>victormendoza@verlo.co</p>
            
            <p className="font-extralight">Front-end developer specialized in interactive websites, data analysis, visualization, and team leadership.</p>

            <div className="flex items-center justify-center space-x-2">
                
                <h2 className="text-2xl font-regular">Experience</h2>
            </div>

            <Card
                subtitle="Developer at"
                title="CREARED"
                footer="2022 - present"
                subtitleStyle="font-extralight"
                titleStyle="font-bold"
                footerStyle="font-extralight"
            />
            <Card
                subtitle="Developer at"
                title="LYBWEB"
                footer="2022 - 2023"
                subtitleStyle="font-extralight"
                titleStyle="font-bold"
                footerStyle="font-extralight"
            />

            <div className="flex items-center justify-center space-x-2">
                
                <h2 className="text-2xl font-regular">Education</h2>
            </div>

            <Card
                subtitle="Software Development at"
                title="CETI COLOMOS"
                footer="2019 - present"
                subtitleStyle="font-extralight"
                titleStyle="font-bold"
                footerStyle="font-extralight"
            />

        </div>
    );
};

export default Sidebar;