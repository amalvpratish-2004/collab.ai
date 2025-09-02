"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CircleIcon, PlusCircleIcon } from "lucide-react"

import { NewAgentDialog } from "./new-agent-dialog"
import { useAgentFilters } from "../../hooks/use-agentfilters"
import { AgentSearchFilter } from "./agents-search-filter"
import { DEFAULT_PAGE } from "@/constants"

export const AgentsListHeader = () => {
    const [ filters, setFilters ] = useAgentFilters();
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

    const isAnyFilterModified = !!filters.search;

    const onClearFilters = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE,
        });
    }
    return(
        <>
            <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Agents</h5>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <PlusCircleIcon />
                        New Agent
                    </Button>
                </div>
                <div className="flex items-center gap-x-2 p-1">
                    <AgentSearchFilter />
                    {isAnyFilterModified && (
                        <Button variant="outline" size="sm" onClick={onClearFilters}>
                            <CircleIcon />
                            Clear
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}