'use client';

import type { Person, SplitGroup } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Users } from 'lucide-react';

type GroupsListProps = {
  groups: SplitGroup[];
  people: Person[];
};

export default function GroupsList({ groups, people }: GroupsListProps) {
  const peopleById = new Map(people.map(p => [p.id, p]));

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Split Groups</CardTitle>
        <CardDescription>Your saved groups for easy expense splitting.</CardDescription>
      </CardHeader>
      <CardContent>
        {groups.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            <Users className="mx-auto h-8 w-8 mb-2" />
            <p>No groups created yet. Add a group to get started.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {groups.map(group => (
              <li key={group.id} className="flex items-center justify-between p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
                <span className="font-medium">{group.name}</span>
                <div className="flex -space-x-2 overflow-hidden">
                  <TooltipProvider>
                    {group.memberIds.map(memberId => {
                      const person = peopleById.get(memberId);
                      if (!person) return null;
                      return (
                        <Tooltip key={memberId}>
                          <TooltipTrigger asChild>
                            <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                              <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{person.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </TooltipProvider>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
