"use client";

import { useDisclosure } from "@reactuses/core";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import ConfirmDialog from "./ConfirmDialog";

type EditAction =
  | { type: "link"; href: string }
  | { type: "callback"; onEdit: () => void };

interface Props {
  editAction: EditAction;
  editLabel?: string;
  deleteTitle?: string;
  deleteDescription?: string;
  deleteLabel?: string;
  onDelete: () => void;
  size?: "sm" | "md";
}

const sizeStyles = {
  md: {
    trigger: "p-1.5",
    icon: "w-4 h-4",
    dropdown: "w-44 top-8",
    item: "px-3 py-2 text-sm gap-2",
    itemIcon: "w-3.5 h-3.5",
  },
  sm: {
    trigger: "p-1",
    icon: "w-3.5 h-3.5",
    dropdown: "w-32 top-7",
    item: "px-2.5 py-1.5 text-xs gap-1.5",
    itemIcon: "w-3 h-3",
  },
};

const AuthorMenu = ({
  editAction,
  editLabel = "Edit",
  deleteTitle = "Delete",
  deleteDescription = "Are you sure? This action cannot be undone.",
  deleteLabel = "Delete",
  onDelete,
  size = "md",
}: Props) => {
  const { isOpen: menuOpen, onOpen, onClose } = useDisclosure();
  // ← ConfirmDialog has its own independent disclosure state
  const {
    isOpen: confirmOpen,
    onOpen: openConfirm,
    onClose: closeConfirm,
  } = useDisclosure();
  const s = sizeStyles[size];

  const handleConfirm = () => {
    onDelete();
    closeConfirm();
  };

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => onOpen()}
        className={`${s.trigger} text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors`}
      >
        <MoreHorizontal className={s.icon} />
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => onClose()} />
          <div
            className={`absolute right-0 ${s.dropdown} z-20 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden py-1`}
          >
            {editAction.type === "link" ? (
              <Link
                href={editAction.href}
                onClick={() => onClose()}
                className={`flex items-center ${s.item} text-gray-600 hover:bg-gray-50 transition-colors`}
              >
                <Pencil className={`${s.itemIcon} text-gray-400`} />
                {editLabel}
              </Link>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  editAction.onEdit();
                }}
                className={`flex items-center ${s.item} text-gray-600 hover:bg-gray-50 transition-colors w-full text-left`}
              >
                <Pencil className={`${s.itemIcon} text-gray-400`} />
                {editLabel}
              </button>
            )}

            <div className="border-t border-gray-100 my-1" />

            <button
              onClick={() => {
                onClose();
                openConfirm();
              }}
              className={`flex items-center ${s.item} text-red-500 hover:bg-red-50 transition-colors w-full text-left`}
            >
              <Trash2 className={s.itemIcon} />
              {deleteLabel}
            </button>
          </div>
        </>
      )}

      <ConfirmDialog
        title={deleteTitle}
        description={deleteDescription}
        confirmLabel={deleteLabel}
        variant="danger"
        isOpen={confirmOpen}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default AuthorMenu;
