import React, { useState, useEffect, Fragment } from 'react'
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { SearchIcon } from '@heroicons/react/outline'

function CommandPalette({ projects }) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('')

  useEffect(() => {

    function onKeyDown(e) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };

  }, [isOpen]);

  
  


  const filteredProjects = query ? 
    projects.filter((project) => {
      const title = project.title.toLowerCase()
      const technologies = project.technologies.toLowerCase();
      return title.includes(query.toLowerCase()) || technologies.includes(query.toLowerCase())
    })
  : []


  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 p-4 pt-[25vh] overflow-y-auto"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-900/75" />
        </Transition.Child>

        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            onChange={(project) => {
              console.log(project);
              // Link to project page
              setIsOpen(false);
              
            }}
            as="div"
            className="relative max-w-xl mx-auto rounded-xl bg-white shadow-2xl 
      ring-1 ring-black/5 divide-y divide-gray-100 overflow-hidden"
          >
            <div className="flex items-center px-4">
              <SearchIcon className="h-6 w-6 text-gray-500" />
              <Combobox.Input
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="h-12 w-full bg-transparent border-0 focus:ring-0 text-sm text-gray-800 placeholder:text-gray-400 outline-0"
                placeholder="Search..."
              />
            </div>
            {filteredProjects.length > 0 && (
              <Combobox.Options
                static
                className="py-4 text-sm max-h-60 overflow-y-auto"
              >
                {filteredProjects.map((project) => {
                  return (
                    <Combobox.Option key={project.id} value={project}>
                      {({ active }) => (
                        <div
                          className={`px-4 py-2 space-x-1 ${
                            active ? "bg-blue-600" : "bg-white"
                          }`}
                        >
                          <span
                            className={`font-medium  ${
                              active ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {project.title}
                          </span>
                          <span
                            className={`font-medium  ${
                              active ? "text-gray-200" : "text-gray-400"
                            }`}
                          >
                            - {project.technologies}
                          </span>
                        </div>
                      )}
                    </Combobox.Option>
                  );
                })}
              </Combobox.Options>
            )}

            {query && filteredProjects.length === 0 && (
              <p className="p-4 text-sm text-green-500">No results found</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

export default CommandPalette