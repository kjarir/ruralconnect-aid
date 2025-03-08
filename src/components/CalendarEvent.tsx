
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, Calendar as CalendarLucide, Tractor, FileText, HeartPulse, ShoppingBag, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: string;
  time: string;
}

interface CalendarEventProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const CalendarEvent = ({ selectedDate, onDateChange }: CalendarEventProps) => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem('calendar-events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'farm',
    time: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const eventTypeIcons = {
    farm: <Tractor className="h-4 w-4" />,
    health: <HeartPulse className="h-4 w-4" />,
    finance: <FileText className="h-4 w-4" />,
    market: <ShoppingBag className="h-4 w-4" />
  };
  
  const eventTypeColors = {
    farm: 'bg-green-100 text-green-800 hover:bg-green-200',
    health: 'bg-red-100 text-red-800 hover:bg-red-200',
    finance: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    market: 'bg-orange-100 text-orange-800 hover:bg-orange-200'
  };

  const saveEvent = () => {
    if (!selectedDate) {
      toast({
        title: "Date Required",
        description: "Please select a date for your event",
        variant: "destructive"
      });
      return;
    }
    
    if (!newEvent.title || !newEvent.type || !newEvent.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: selectedDate,
      type: newEvent.type,
      time: newEvent.time
    };

    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    localStorage.setItem('calendar-events', JSON.stringify(updatedEvents));
    
    setNewEvent({
      title: '',
      description: '',
      type: 'farm',
      time: ''
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Event Added",
      description: `${event.title} has been scheduled for ${format(event.date, 'PPP')}`,
    });
  };

  const deleteEvent = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('calendar-events', JSON.stringify(updatedEvents));
    
    toast({
      title: "Event Removed",
      description: "The event has been deleted from your calendar",
    });
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    return events.filter(event => 
      new Date(event.date).setHours(0, 0, 0, 0) === new Date(selectedDate).setHours(0, 0, 0, 0)
    );
  };

  // Date has events indicator function for the calendar
  const dateHasEvents = (date: Date) => {
    return events.some(event => 
      new Date(event.date).setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center mb-1">
        <CalendarLucide className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Calendar & Activities</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            className="rounded-md"
            modifiers={{
              hasEvents: dateHasEvents
            }}
            modifiersClassNames={{
              hasEvents: "bg-primary/20 font-bold"
            }}
          />
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">
              {selectedDate ? (
                <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
              ) : (
                <span>Select a date</span>
              )}
            </h4>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Create a new event for your calendar.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={onDateChange}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      placeholder="Event title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      placeholder="e.g. 10:00 AM"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select
                      value={newEvent.type}
                      onValueChange={(value) => setNewEvent({...newEvent, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="farm">Farming</SelectItem>
                        <SelectItem value="health">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="market">Market</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      placeholder="Add details about this event"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={saveEvent}>Add Event</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {selectedDate ? (
            <div className="space-y-3 flex-1 overflow-auto">
              {getEventsForSelectedDate().length > 0 ? (
                getEventsForSelectedDate().map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-3 rounded-md flex flex-col",
                      eventTypeColors[event.type as keyof typeof eventTypeColors]
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {eventTypeIcons[event.type as keyof typeof eventTypeIcons]}
                        <span className="font-medium">{event.title}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0 rounded-full"
                        onClick={() => deleteEvent(event.id)}
                      >
                        <span className="sr-only">Delete</span>
                        <span aria-hidden>×</span>
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs mt-1 opacity-80">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    
                    {event.description && (
                      <div className="mt-2 text-sm opacity-90">{event.description}</div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full flex-col gap-2 text-muted-foreground p-4">
                  <CalendarLucide className="h-10 w-10 opacity-20" />
                  <p className="text-center text-sm">No events scheduled for this day</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Schedule Event
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full flex-col gap-2 text-muted-foreground p-4">
              <CalendarIcon className="h-10 w-10 opacity-20" />
              <p className="text-center text-sm">Select a date to view or add events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarEvent;
