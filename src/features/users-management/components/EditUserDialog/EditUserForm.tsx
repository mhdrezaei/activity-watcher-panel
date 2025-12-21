"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { UserTableRow } from "../../types";

type Props = {
  user: UserTableRow;
  onClose: () => void;
};

export function EditUserForm({ user, onClose }: Props) {
  const [name, setName] = useState(user.name);
  const [hostname, setHostname] = useState(user.hostname);

  const updateMutation = useUpdateUser();

  const handleSubmit = () => {
    updateMutation.mutate(
      { id: user.id, name, hostname },
      {
        onSuccess: onClose,
      }
    );
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="نام کاربر"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="نام سیستم"
        value={hostname}
        onChange={(e) => setHostname(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          انصراف
        </Button>

        <Button onClick={handleSubmit} disabled={updateMutation.isPending}>
          {updateMutation.isPending ? "در حال ذخیره..." : "ذخیره"}
        </Button>
      </div>
    </div>
  );
}
