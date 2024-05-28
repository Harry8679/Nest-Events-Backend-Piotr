// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';

@Controller('/events')
export class EventsController {
  private events: Event[] = [];
  //   [
  //     { id: 1, name: 'First event' },
  //     { id: 2, name: 'Second event' },
  //   ]
  @Get()
  findAll() {
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    // return { id: 1, name: 'First event' };
    const event = this.events.find((event) => event.id === parseInt(id));

    return event;
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    const event = {
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    };
    this.events.push(event);

    return event;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    return input;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id) {}
}
