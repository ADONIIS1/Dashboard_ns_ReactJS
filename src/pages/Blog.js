import React from 'react';

function Blog() {
    return (
        <div class="flex justify-center items-center h-screen">
            <div class="grid grid-cols-2 gap-8 md:max-w-screen-md lg:max-w-screen-xl">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs">
                    <div class="p-4">
                        <h2 class="text-lg font-medium text-gray-900 mb-2">Card 1</h2>
                        <img
                            src="https://i.pinimg.com/736x/7d/83/2a/7d832a6867b7a6b4fbec7ff05864df6e.jpg"
                            alt="Card 222222222222221"
                            class="w-44 h-44 object-cover"
                        />
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs">
                    <div class="p-4">
                        <h2 class="text-lg font-medium text-gray-900 mb-2">Card 1</h2>
                        <img
                            src="https://i.pinimg.com/736x/7d/83/2a/7d832a6867b7a6b4fbec7ff05864df6e.jpg"
                            alt="Card 222222222222221"
                            class="w-24 h-20 object-cover"
                        />
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs">
                    <div class="p-4">
                        <h2 class="text-lg font-medium text-gray-900 mb-2">Card 1</h2>
                        <img
                            src="https://i.pinimg.com/736x/7d/83/2a/7d832a6867b7a6b4fbec7ff05864df6e.jpg"
                            alt="Card 222222222222221"
                            class="w-24 h-20 object-cover"
                        />
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs">
                    <div class="p-4">
                        <h2 class="text-lg font-medium text-gray-900 mb-2">Card 1</h2>
                        <img
                            src="https://i.pinimg.com/736x/7d/83/2a/7d832a6867b7a6b4fbec7ff05864df6e.jpg"
                            alt="Card 222222222222221"
                            class="w-24 h-20 object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;
