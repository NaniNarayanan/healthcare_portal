import React from "react";

export default function Card({ icon, title, subtitle, right, children }) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {icon && <div className="p-2 rounded-full bg-emerald-50 text-emerald-600">{icon}</div>}
          <div>
            <div className="text-sm font-medium text-gray-700">{title}</div>
            {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
          </div>
        </div>
        <div className="text-right">{right}</div>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
}