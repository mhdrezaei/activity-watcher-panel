// src/shared/components/ui/searchable-select/searchable-select.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils/shadcn"; // مسیر 유تیلیتی خود را چک کنید

export interface SelectOption {
  value: string;
  label: string;
  subLabel?: string; // برای نمایش متن کمرنگ دوم (مثل نام کاربری، ایمیل یا هاست‌نیم)
}

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  disabledValue?: string; // مقداری که می‌خواهیم غیرقابل انتخاب باشد
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید...",
  disabled,
  disabledValue,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opt.subLabel &&
        opt.subLabel.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          !selectedOption && "text-muted-foreground",
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 bg-card">
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-10 w-full rounded-md bg-transparent py-3 pr-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto custom-scrollbar p-1">
            {filteredOptions.length === 0 ? (
              <p className="p-4 text-center text-sm text-muted-foreground">
                موردی یافت نشد.
              </p>
            ) : (
              filteredOptions.map((opt) => {
                const isDisabled = opt.value === disabledValue;
                const isSelected = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => {
                      if (!isDisabled) {
                        onChange(opt.value);
                        setIsOpen(false);
                        setSearchTerm("");
                      }
                    }}
                    className={cn(
                      "relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-2 pr-8 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                      isDisabled &&
                        "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-current",
                      isSelected &&
                        "bg-accent/50 text-accent-foreground font-medium",
                    )}
                  >
                    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                      {isSelected && <Check className="h-4 w-4" />}
                    </span>
                    {opt.label}
                    {opt.subLabel && (
                      <span className="text-xs text-muted-foreground mr-2 truncate hidden md:inline-block">
                        ({opt.subLabel})
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
