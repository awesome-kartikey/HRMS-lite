import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAttendance, markAttendance } from "@/api/attendance.api";
import { toast } from "sonner";
import { AxiosError } from "axios";


export function useAttendance() {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: getAttendance,
  });
}

export function useMarkAttendance(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      toast.success("Attendance marked successfully");
      onSuccess?.();
    },
    onError: (error: AxiosError<{ detail: string }>) => {
      toast.error(error.response?.data?.detail || "Failed to mark attendance");
    },
  });
}
