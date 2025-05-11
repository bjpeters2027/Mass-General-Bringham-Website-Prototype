"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button.tsx"
import { trpc } from "@/lib/trpc"
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
} from "@/components/ui/Popover"

interface Employee {
    id: string;
    name: string;
}

interface EmployeeDropdownProps {
    selectedEmployee: Employee | null;
    setEmployee: (employee: Employee | null) => void;
    placeholder?: string;
    width?: string;
}

export function EmployeeDropdown({
                                     selectedEmployee,
                                     setEmployee,
                                     placeholder = 'Select an employee...',
                                     width,
                                 }: EmployeeDropdownProps) {
    const [open, setOpen] = React.useState(false)
    const {
        data: employeesRaw = [],
        isLoading,
    } = trpc.getEmployees.useQuery()

    const employees: Employee[] = React.useMemo(
        () =>
            employeesRaw.map((emp: any) => ({
                id: emp.id,
                name: emp.employee_name,
            })),
        [employeesRaw]
    )

    return (
        <div className="flex items-start  space-x-4">
            {/* Employee Name section */}
            <div className="flex flex-col w-full">
        <span className="text-[11pt] font-[Poppins] text-black mb-1">
          Employee Name
        </span>
                <div className="relative">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn(
                                    `h-[48px] bg-white font-[Poppins] w-full text-[11pt] shadow font-normal justify-between ${width}`,
                                    !selectedEmployee && !open ? 'text-black' : 'text-black'
                                )}
                            >
                                {selectedEmployee?.name || placeholder}
                                <ChevronDown
                                    className={cn('opacity-50', !open ? 'text-gray-500' : 'text-black')}
                                />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-70 bg-white max-h-[275px] p-0 font-[Poppins]">
                            <Command>
                                <CommandList>
                                    <CommandGroup>
                                        {isLoading ? (
                                            <CommandItem disabled>Loading...</CommandItem>
                                        ) : (
                                            employees.map((emp) => (
                                                <CommandItem
                                                    key={emp.id}
                                                    value={emp.name}
                                                    onSelect={() => {
                                                        setEmployee(
                                                            emp.id === selectedEmployee?.id ? null : emp
                                                        )
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {emp.name}
                                                    <Check
                                                        className={cn(
                                                            'ml-auto',
                                                            emp.id === selectedEmployee?.id
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))
                                        )}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Employee ID section */}
            {selectedEmployee && (
                <div className={'w-full'}>
          <span className="text-[11pt] font-[Poppins] text-black">
            Employee ID
          </span>
                    <div className="h-[48px] mt-1 w-full bg-white shadow border border-input rounded-md px-4 py-2 font-[Poppins] text-[11pt] text-black flex items-center">
                        {selectedEmployee.id}
                    </div>
                </div>
            )}
        </div>
    )
}
