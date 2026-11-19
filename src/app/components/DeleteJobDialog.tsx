"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { deleteJob } from "@/lib/actions/jobs"
import { jobStyles } from "@/lib/styles/jobs"
import type { JobRow } from "@/lib/types/jobs"

export function DeleteJobDialog({ job }: { job: JobRow }) {
    const router = useRouter()

    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        const res = await deleteJob(job._id)
        console.log('deleting', job._id, res)
        if (res.deletedCount) {
            setOpen(false)
            toast.add({
                title: "Job deleted",
                description: "The job post has been deleted successfully.",
            })
            router.refresh();
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="ghost"
                        aria-label={`Delete ${job.title}`}
                        className={jobStyles.tableIconButton}
                    >
                        <Trash2Icon className="size-4" />
                    </Button>
                }
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete job post?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete <strong>{job.title}</strong>. This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
