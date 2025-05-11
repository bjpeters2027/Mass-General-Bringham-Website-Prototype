"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button.tsx"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../ui/Popover"

export function SRQDropdown({options, value, setValue, error, clearError, placeholder, originalValue, width, styledOptions} : {
    options: string[];
    value: string;
    setValue: (value: string) => void;
    error?: string;
    clearError?: ()=>void;
    placeholder: string;
    styledOptions?: (option: string) => string;
    originalValue?: string;
    width?: string;
}) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className={"relative"}>
            {error && (
                <div className="absolute bg-white bottom-full left-18 mb-2">
                    <div className="bg-red-100 text-red-800 font-medium pr-5 pl-8 py-2 rounded text-sm relative border border-red-300 shadow-md">
                        <svg
                            viewBox="0 0 24 24"
                            className="absolute top-2 left-1 text-red-800 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                        >
                            <path
                                fill="currentColor"
                                d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
                            ></path>
                        </svg>
                        {error}
                        <button
                            onClick={() => clearError?.()}
                            className="absolute top-0 right-1 text-red-300 hover:text-red-800 font-bold text-base leading-none"
                            aria-label="Dismiss error"
                        >
                            &times;
                        </button>

                        {/* Triangle container div - for positioning */}
                        <div className="absolute top-full left-0 w-full h-0 flex justify-center items-start overflow-visible">
                            {/* border - slightly bigger triangle*/}
                            <div className ="w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-red-300 absolute top-0 left-[20px] -translate-x-1/2 transform">
                            </div>

                            {/* Inner triangle (background color) */}
                            <div className = "w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-red-100 absolute top-0 left-[20px] -translate-x-1/2 transform">
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={`w-full h-[48px] bg-white font-[Poppins] text-[11pt] shadow font-normal justify-between ${value == "" && !open ? "text-gray-500" : "text-black"} ${width || 'w-[396px]'} ${
                            styledOptions ? styledOptions(value) : ''}`}
                        onClick={() => console.log("Dropdown pressed")}
                    >
                        {value
                            ? options.find((option) => option === value)
                            : placeholder}
                        <ChevronDown className={`opacity-50" ${!open ? "text-gray-500" : "text-black"}`} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-70 bg-white max-h-[275px] p-0 font-[Poppins]">
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                {options.map((option) => {

                                    const displayOption = (originalValue === value) ? `${option}*` : option;
                                    const optionStyle = styledOptions ? styledOptions(value) : '';
                                    return (
                                    <CommandItem
                                        key={option}
                                        value={option}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                        // className={optionStyle}
                                    >
                                        {displayOption}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === option ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                )})}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}